import mongoose, { Document, Model } from "mongoose";

// Define the Counter document schema and model
interface ICounter extends Document {
  _id: string;
  sequence_value: number;
}

const Counter: Model<ICounter> = mongoose.model<ICounter>("Counter");

async function getNextSequenceValue(sequenceName: string): Promise<number> {
  try {
    const counter: ICounter | null = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true } // Create the counter if it doesn't exist
    );

    if (counter) {
      return counter.sequence_value;
    } else {
      throw new Error("Counter not found");
    }
  } catch (error) {
    throw error;
  }
}

export default getNextSequenceValue;
