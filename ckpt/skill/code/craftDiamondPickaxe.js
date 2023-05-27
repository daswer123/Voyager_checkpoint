async function craftDiamondPickaxe(bot) {
  // Step 1: Equip the iron pickaxe from the inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Find and mine 1 diamond ore to get 1 more diamond
  await mineOneDiamondOre(bot);

  // Step 3: Craft 1 more stick using the spruce planks in the inventory if needed
  const sticks = bot.inventory.findInventoryItem(mcData.itemsByName.stick.id);
  if (!sticks || sticks.count < 2) {
    await craftItem(bot, "stick", 1);
  }

  // Step 4: Check if there is a crafting table nearby or in the inventory, and place it if needed
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  }) || bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }
  const craftingTableBlock = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTableBlock) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
  }

  // Step 5: Craft a diamond pickaxe using 3 diamonds and 2 sticks
  await craftItem(bot, "diamond_pickaxe", 1);
  bot.chat("Diamond pickaxe crafted.");
}