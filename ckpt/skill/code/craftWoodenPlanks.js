async function craftWoodenPlanks(bot) {
  // Check if there is a crafting table in the inventory or nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  }) || bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft a crafting table using the spruce_log in the inventory
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft 4 wooden planks using the spruce_log in the inventory
  await craftItem(bot, "spruce_planks", 1);
  bot.chat("4 wooden planks crafted.");
}