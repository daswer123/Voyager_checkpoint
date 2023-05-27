async function craftStonePickaxe(bot) {
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

  // Craft a stone pickaxe using 3 cobblestone and 2 sticks
  await craftItem(bot, "stone_pickaxe", 1);
  bot.chat("Stone pickaxe crafted.");
}