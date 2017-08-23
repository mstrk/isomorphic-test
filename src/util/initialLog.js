/**
 *
 * Initial server log
 *
 */

import ip from 'ip'
import chalk from 'chalk'

export default (env, port) =>
  console.log(`
 ${chalk.magenta('=============================')}
 local: ${chalk.blue(`https://localhost:${port}`)}
 LAN: ${chalk.blue(`https://${ip.address()}:${port}`)}
 Mode: ${chalk.blue(`${env}`)}
 ${chalk.magenta('=============================')}
  `);
