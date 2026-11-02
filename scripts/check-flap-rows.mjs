// Pakai: node scripts/check-flap-rows.mjs
import assert from 'node:assert/strict'
import { layoutRows } from '../src/lib/flapBoard.js'

assert.deepEqual(layoutRows('Kevin Febrian Bimantara', 13), ['KEVIN FEBRIAN', 'BIMANTARA'])
assert.deepEqual(layoutRows('Kevin Febrian Bimantara', 9), ['KEVIN', 'FEBRIAN', 'BIMANTARA'])
assert.deepEqual(layoutRows('  Ana   Bo ', 13), ['ANA BO'])
console.log('ok')
