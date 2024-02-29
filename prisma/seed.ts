import { PrismaClient } from "@prisma/client";
import seedData from "./seed.json";

const prisma = new PrismaClient();

async function createUsers() {
  return Promise.all(
    seedData.User.map(async (user) => {
      return prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          image: user.image,
          role: user.role,
        },
      });
    })
  );
}

async function createPosts() {
  for (const postData of seedData.Post) {
    const post = await prisma.post.create({
      data: {
        id: postData.id,
        authorId: postData.authorId,
        category: postData.category,
        title: postData.title,
        firstWords: postData.firstWords,
        content: postData.content,
        image: postData.image,
        published: postData.published,
        publishedAt: postData.publishedAt,
        createdAt: postData.createdAt,
        updatedAt: postData.updatedAt,
      },
    });

    if (postData.comments) {
      for (const commentData of postData.comments) {
        await prisma.comment.create({
          data: {
            postId: post.id,
            authorId: commentData.authorId,
            content: commentData.content,
            createdAt: commentData.createdAt,
            updatedAt: commentData.updatedAt,
          },
        });
      }
    }
  }
}

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await createUsers();
  await createPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
