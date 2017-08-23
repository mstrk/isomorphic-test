/*
 *
 * Combine all sagas in the this file
 * and export them.
 *
 */

import UsersSagas from '../modules/RandomUser/sagas'

const sagas = [...UsersSagas]

export default sagas
