export type TSmartphone = {
  name: string;
  price: number;
  quantity: number;
  productImage: string;
  releaseDate: Date;
  brand:
    | "Apple"
    | "Samsung"
    | "Huawei"
    | "Xiaomi"
    | "Oppo"
    | "Vivo"
    | "Lenovo"
    | "LG"
    | "Google"
    | "OnePlus";

  model: string;
  operatingSystem: "Android" | "IOS";
  storageCapacity:
    | "16GB"
    | "32GB"
    | "64GB"
    | "128GB"
    | "256GB"
    | "512GB"
    | "1TB";
  screenSize:
    | "4 inches"
    | "4.7 inches"
    | "5 inches"
    | "5.5 inches"
    | "6 inches"
    | "6.4 inches"
    | "6.7 inches"
    | "6.9 inches";
  camera:
    | "8MP"
    | "12MP"
    | "16MP"
    | "20MP"
    | "24MP"
    | "32MP"
    | "48MP"
    | "64MP"
    | "108MP";
  battery:
    | "1000mAh"
    | "2000mAh"
    | "3000mAh"
    | "4000mAh"
    | "5000mAh"
    | "6000mAh"
    | "7000mAh";
};
