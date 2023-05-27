async function craftIronPickaxe(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_ingot.id);
  if (!ironIngots || ironIngots.count < 3) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 3 - (ironIngots ? ironIngots.count : 0));

    // Check if there is a furnace in the inventory or nearby
    const furnace = bot.findBlock({
      matching: mcData.blocksByName.furnace.id,
      maxDistance: 32
    });

    // If not, place the furnace from the inventory
    if (!furnace) {
      const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
      if (furnaceItem) {
        const furnacePosition = bot.entity.position.offset(1, 0, 0);
        await placeItem(bot, "furnace", furnacePosition);
      } else {
        bot.chat("No furnace found.");
        return;
      }
    }

    // Smelt the iron ores in the furnace to obtain the required iron ingots
    await smeltItem(bot, "raw_iron", "coal", 3 - (ironIngots ? ironIngots.count : 0));
  }

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

  // Craft an iron pickaxe using 3 iron ingots and 2 sticks
  await craftItem(bot, "iron_pickaxe", 1);
  bot.chat("Iron pickaxe crafted.");
}