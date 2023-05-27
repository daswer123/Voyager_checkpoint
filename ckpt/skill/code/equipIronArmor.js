async function equipIronArmor(bot) {
  // Equip the iron helmet from the inventory
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName.iron_helmet.id);
  if (ironHelmet) {
    await bot.equip(ironHelmet, "head");
    bot.chat("Iron helmet equipped.");
  } else {
    bot.chat("No iron helmet found in inventory.");
  }

  // Equip the iron leggings from the inventory
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName.iron_leggings.id);
  if (ironLeggings) {
    await bot.equip(ironLeggings, "legs");
    bot.chat("Iron leggings equipped.");
  } else {
    bot.chat("No iron leggings found in inventory.");
  }

  // Equip the iron boots from the inventory
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_boots.id);
  if (ironBoots) {
    await bot.equip(ironBoots, "feet");
    bot.chat("Iron boots equipped.");
  } else {
    bot.chat("No iron boots found in inventory.");
  }
}