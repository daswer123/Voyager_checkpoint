async function mineTenCobblestone(bot) {
  // Find a stone block
  const stone = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const stoneBlock = bot.findBlock({
      matching: mcData.blocksByName["stone"].id,
      maxDistance: 32
    });
    return stoneBlock;
  });
  if (stone) {
    // Mine 10 cobblestone
    await mineBlock(bot, "stone", 10);
    bot.chat("10 cobblestone mined.");
  } else {
    bot.chat("Could not find a stone block.");
  }
}