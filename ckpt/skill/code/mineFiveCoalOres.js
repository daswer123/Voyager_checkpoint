async function mineFiveCoalOres(bot) {
  // Check if there are 5 coal ores nearby
  const coalOres = bot.findBlocks({
    matching: mcData.blocksByName["coal_ore"].id,
    maxDistance: 32,
    count: 5
  });

  // If not, explore the area to find coal ores
  if (coalOres.length < 5) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const coalOre = bot.findBlock({
        matching: mcData.blocksByName["coal_ore"].id,
        maxDistance: 32
      });
      return coalOre;
    });
  }

  // Mine 5 coal ores using the stone_pickaxe
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("5 coal ores mined.");
}