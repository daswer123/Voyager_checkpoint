async function killOnePig(bot) {
  // Equip the iron_pickaxe from the inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find the nearest pig and kill it using the iron_pickaxe
  await killMob(bot, "pig", 300);
  bot.chat("1 pig killed.");
}