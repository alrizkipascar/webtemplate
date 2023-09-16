import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
  highestComment: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.groupBy({
      by: ["topicId"],
      _count: true,
      orderBy: { _count: { topicId: "desc" } },
      take: 1,
    });
  }),
  totalUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count({
      select: {
        _all: true, // Count all records
        // name: true, // Count all non-null field values
      },
    });
  }),
  totalTopic: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.count({
      select: {
        _all: true, // Count all records
      },
    });
  }),
  getAll: publicProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  countComment: publicProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.count({
        where: {
          topicId: input.topicId,
        },
      });
    }),
});
