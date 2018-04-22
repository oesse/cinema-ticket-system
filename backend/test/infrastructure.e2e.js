import { expect } from 'chai'
import mongoose from 'mongoose'

const testSchema = mongoose.Schema({ value: String })
const TestModel = mongoose.model('TestSchema', testSchema)

describe('end to end tests', () => {
  it('have access to mongodb', async () => {
    const m = new TestModel({ value: 'v' })
    await m.save()
    const retrieved = await TestModel.findOne({ _id: m.id }).exec()
    expect(retrieved).to.have.property('value', 'v')
  })

  it('are clean up after on every test run', async () => {
    const m = new TestModel({ value: 'v' })
    const n = new TestModel({ value: 'u' })
    await m.save()
    await n.save()

    const retrieved = await TestModel.find().exec()
    expect(retrieved).to.be.an('array').which.has.length(2)
  })
})
