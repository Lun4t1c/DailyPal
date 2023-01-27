import type { ObjectId } from "mongodb";


export interface fitnessMeasurementModel {
    _id?: ObjectId | undefined,
    date: Date,
    weight: number,
    bmi: number,
    bodyFat: number,
    bodyWater: number,
    muscleMass: number,
    boneMass: number,
    dci: number,
    metabolicAge: number
}