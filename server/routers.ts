import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createAcquisitionProfile, listAcquisitionProfiles } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

const acquisitionProfileInput = z.object({
  objective: z.string().min(1).max(80),
  propertyType: z.string().min(1).max(120),
  regions: z.string().min(2).max(2000),
  budget: z.string().min(1).max(120),
  paymentMethod: z.string().min(1).max(120),
  timeline: z.string().min(1).max(120),
  mustHaves: z.string().min(2).max(4000),
  priorities: z.string().min(2).max(4000),
  name: z.string().min(2).max(160),
  email: z.string().email().max(320),
  phone: z.string().min(8).max(40),
});

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito ao consultor." });
  }
  return next();
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  acquisition: router({
    submit: publicProcedure.input(acquisitionProfileInput).mutation(async ({ input }) => {
      await createAcquisitionProfile(input);
      return { success: true } as const;
    }),
    list: adminProcedure.query(async () => listAcquisitionProfiles()),
  }),
});

export type AppRouter = typeof appRouter;
