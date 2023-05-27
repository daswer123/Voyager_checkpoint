async function craftIronSword(bot) {
  // Check if there is a crafting table in the inventory or nearby
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // If not, place the crafting table from the inventory
  if (!craftingTable) {
    const craftingTableItem = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
    if (craftingTableItem) {
      const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "crafting_table", craftingTablePosition);
    } else {
      bot.chat("No crafting table found.");
      return;
    }
  }

  // Craft an iron sword using 2 iron ingots and 1 stick
  await craftItem(bot, "iron_sword", 1);
  bot.chat("Iron sword crafted.");
}