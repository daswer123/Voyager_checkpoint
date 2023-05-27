// Fix the moveToChest function if needed
async function moveToChest(bot, chestPosition) {
  const chestBlock = bot.blockAt(chestPosition);
  if (!chestBlock || chestBlock.name !== "chest") {
    throw new Error(`No chest at ${chestPosition}, it is ${chestBlock?.name}`);
  }
  const goal = new GoalGetToBlock(chestPosition.x, chestPosition.y, chestPosition.z);
  await bot.pathfinder.goto(goal);
}

// Call the openChestAtPosition function again

// Call the openChestAtPosition function again
async function openChestAtPosition(bot) {
  const chestPosition = new Vec3(-27, 62, 38);
  await moveToChest(bot, chestPosition);
  const chestBlock = bot.blockAt(chestPosition);
  await bot.openContainer(chestBlock);
  await closeChest(bot, chestBlock);
  bot.chat("Chest opened and checked.");
}