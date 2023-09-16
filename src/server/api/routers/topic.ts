import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx?.session?.user?.id,
      },
    });
  }),
  getAllFront: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    //   {
    //   where: {
    //     userId: ctx.session.id,
    //   },
    // }
  }),
  getId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.topic.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.topic.findMany({
        where: {
          OR: [
            {
              content: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              user: {
                name: {
                  contains: input.search,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          user: true,
        },
      });
    }),
});
