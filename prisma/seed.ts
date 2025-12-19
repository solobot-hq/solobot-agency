import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ⚠️ REPLACE THIS WITH A REAL CLERK USER ID FROM YOUR DASHBOARD ⚠️
  // If you don't set this, the workspaces will be created but not attached to your logged-in user.
  const TARGET_USER_ID = "user_2xxxxxxxxxxxxxxxxx"; 

  if (TARGET_USER_ID === "user_2xxxxxxxxxxxxxxxxx") {
    console.warn("⚠️ WARNING: Please set a valid TARGET_USER_ID in prisma/seed.ts to assign workspaces to yourself.");
  }

  const defaultWorkspaces = [
    {
      name: "Agency Internal",
      ownerId: TARGET_USER_ID,
    },
    {
      name: "Client Workspace A",
      ownerId: TARGET_USER_ID,
    }
  ];

  console.log(`🌱 Start seeding workspaces...`);
  
  for (const ws of defaultWorkspaces) {
    const created = await prisma.workspace.create({
      data: ws,
    });
    console.log(`✅ Created workspace: ${created.name} (${created.id})`);
  }
  
  console.log(`🏁 Seeding finished.`);
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