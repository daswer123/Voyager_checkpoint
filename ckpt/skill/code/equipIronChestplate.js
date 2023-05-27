async function equipIronChestplate(bot) {
  // Check if the bot has an iron chestplate in its inventory
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName.iron_chestplate.id);

  // Equip the iron chestplate if found
  if (ironChestplate) {
    await bot.equip(ironChestplate, "torso");
    bot.chat("Iron chestplate equipped.");
  } else {
    bot.chat("No iron chestplate found in inventory.");
  }
}