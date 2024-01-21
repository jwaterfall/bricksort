import chalk from "chalk";

const PROGRESS_BAR_LENGTH = 50;

const getProgressBar = (total: number, current: number) => {
  const percentComplete = Math.round((current / total) * 100);
  const bars = Math.round((percentComplete / 100) * PROGRESS_BAR_LENGTH);
  return `${chalk.green("=".repeat(bars))}${" ".repeat(PROGRESS_BAR_LENGTH - bars)} ${percentComplete}% (${current}/${total})`;
};

export default getProgressBar;
