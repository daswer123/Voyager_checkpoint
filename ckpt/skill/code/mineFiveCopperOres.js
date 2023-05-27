async function mineFiveCopperOres(bot) {
  // Check if there are 5 copper ores nearby
  const copperOres = bot.findBlocks({
    matching: mcData.blocksByName["copper_ore"].id,
    maxDistance: 32,
    count: 5
  });

  // If not, explore the area to find copper ores
  if (copperOres.length < 5) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const copperOre = bot.findBlock({
        matching: mcData.blocksByName["copper_ore"].id,
        maxDistance: 32
      });
      return copperOre;
    });
  }

  // Mine 5 copper ores using the iron_pickaxe
  await mineBlock(bot, "copper_ore", 5);
  bot.chat("5 copper ores mined.");
}