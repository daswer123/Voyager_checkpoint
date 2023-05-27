async function craftIronHelmet(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_ingot.id);
  if (!ironIngots || ironIngots.count < 5) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 5 - (ironIngots ? ironIngots.count : 0));

    // Smelt the iron ores to obtain the required iron ingots
    await smeltItem(bot, "raw_iron", "coal", 5 - (ironIngots ? ironIngots.count : 0));
  }

  // Check if there is a crafting table nearby or in the inventory
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // If not, place the crafting table from the inventory
  if (!craftingTable) {
    const craftingTableItem = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
    if (craftingTableItem) {
      const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "crafting_table", craftingTablePosition);
      craftingTable = bot.blockAt(craftingTablePosition);
    } else {
      bot.chat("No crafting table found.");
      return;
    }
  }

  // Craft an iron helmet using 5 iron ingots
  await craftItem(bot, "iron_helmet", 1);
  bot.chat("Iron helmet crafted.");
}