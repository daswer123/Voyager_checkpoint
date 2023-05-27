async function mineWoodLog(bot) {
  const woodLogNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];

  // Find a wood log block
  const woodLog = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    for (const name of woodLogNames) {
      const log = bot.findBlock({
        matching: mcData.blocksByName[name].id,
        maxDistance: 32
      });
      if (log) {
        return log;
      }
    }
    return null;
  });
  if (woodLog) {
    // Mine the wood log block
    await mineBlock(bot, woodLog.name, 1);
    bot.chat("Wood log mined.");
  } else {
    bot.chat("Could not find a wood log.");
  }
}