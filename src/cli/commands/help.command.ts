import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.blue('Программа для подготовки данных для REST API сервера.')}

      Пример: cli.js --<command> [--arguments]

      Команды:

        ${chalk.green('--version:                   # выводит номер версии')}
        ${chalk.red('--help:                      # печатает этот текст')}
        ${chalk.bgGreen(
          '--import <path>:             # импортирует данные из TSV'
        )}
        ${chalk.red(
          '--generate <n> <path> <url>:                      # генерирует произвольное количество тестовых данных'
        )}
  `);
  }
}
