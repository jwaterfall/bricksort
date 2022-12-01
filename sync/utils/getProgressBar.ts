import chalk from "chalk";

const PROGRESS_BAR_LENGTH = 50;

const getProgressBar = (total: number, successful: number, failed = 0) => {
  const percentComplete = Math.round(((successful + failed) / total) * 100);
  const bars = Math.round((percentComplete / 100) * PROGRESS_BAR_LENGTH);
  return `${chalk.green("=".repeat(bars))}${" ".repeat(PROGRESS_BAR_LENGTH - bars)} ${percentComplete}% (Total: ${chalk.cyan(
    total
  )}, Successful: ${chalk.green(successful)}, Failed: ${chalk.red(failed)})`;
};

export default getProgressBar;
