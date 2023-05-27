async function cookPorkchops(bot) {
  // Check if there is a crafting table in the inventory or nearby
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // If not, mine wood, craft a crafting table, and place it
  if (!craftingTable) {
    const craftingTableItem = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
    if (!craftingTableItem) {
      await mineBlock(bot, "oak_log", 1);
      await craftItem(bot, "crafting_table", 1);
    }
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    craftingTable = bot.blockAt(craftingTablePosition);
  }

  // Check if there is a furnace in the inventory or nearby
  let furnace = bot.findBlock({
    matching: mcData.blocksByName.furnace.id,
    maxDistance: 32
  });

  // If not, mine cobblestone, craft a furnace, and place it
  if (!furnace) {
    const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
    if (!furnaceItem) {
      await mineBlock(bot, "stone", 8);
      await craftItem(bot, "furnace", 1);
    }
    const furnacePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "furnace", furnacePosition);
    furnace = bot.blockAt(furnacePosition);
  }

  // Check if there are enough raw porkchops in the inventory
  const rawPorkchops = bot.inventory.findInventoryItem(mcData.itemsByName.porkchop.id);
  if (!rawPorkchops || rawPorkchops.count < 3) {
    // Kill pigs to collect the required raw porkchops
    await killMob(bot, "pig", 300);
  }

  // Check if there is enough fuel (coal or wood) in the inventory
  const fuel = bot.inventory.findInventoryItem(mcData.itemsByName.coal.id) || bot.inventory.findInventoryItem(mcData.itemsByName.oak_log.id);
  if (!fuel) {
    // Mine coal or chop wood to collect the required fuel
    await mineBlock(bot, "coal_ore", 1);
  }

  // Smelt the raw porkchops in the furnace using the fuel
  await smeltItem(bot, "porkchop", fuel.name, 3);
  bot.chat("3 porkchops cooked.");
}