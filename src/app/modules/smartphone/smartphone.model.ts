import { Schema, model } from "mongoose";
import { TSmartphone } from "./smartphone.interface";

export const smartphoneSchema = new Schema<TSmartphone>(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
    },
    brand: {
      type: String,
      enum: [
        "Apple",
        "Samsung",
        "Huawei",
        "Xiaomi",
        "Oppo",
        "Vivo",
        "Lenovo",
        "LG",
        "Google",
        "OnePlus",
      ],
      required: [true, "Brand is Required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "ReleaseaDate is Required"],
    },
    camera: {
      type: String,
      enum: [
        "8MP",
        "12MP",
        "16MP",
        "20MP",
        "24MP",
        "32MP",
        "48MP",
        "64MP",
        "108MP",
      ],
      required: [true, "Camera is Required"],
    },
    productImage: {
      type: String,
      required: true,
    },
    battery: {
      type: String,
      enum: [
        "1000mAh",
        "2000mAh",
        "3000mAh",
        "4000mAh",
        "5000mAh",
        "6000mAh",
        "7000mAh",
      ],
      required: [true, "Battery is Required"],
    },
    model: {
      type: String,
      required: [true, "Model is Required"],
    },
    operatingSystem: {
      type: String,
      enum: ["Android", "IOS"],
      required: [true, "OperatingSystem is Required"],
    },
    screenSize: {
      type: String,
      enum: [
        "4 inches",
        "4.7 inches",
        "5 inches",
        "5.5 inches",
        "6 inches",
        "6.4 inches",
        "6.7 inches",
        "6.9 inches",
      ],
      required: [true, "ScreenSize is Required"],
    },
    storageCapacity: {
      type: String,
      enum: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
      required: [true, "StorageCapacity is Required"],
    },
  },
  { timestamps: true }
);
// smartphoneSchema.pre("findOneAndUpdate", async function (doc) {
//     console.log(doc)

//     if (this.quantity < doc.quantity) {
//         throw new Error(`in Stock ${this.quantity} available`)
//     }

//     else if (this.quantity === 0) {
//         await Smartphone.findByIdAndDelete(doc.smartphone)
//     }
// });
export const Smartphone = model<TSmartphone>("Smartphone", smartphoneSchema);
