"use server";

import { db } from "@/db";
import { holdings } from "@/db/schema";

type CreateHoldingParams = {
  asset: {
    id: string;
    symbol: string;
    name: string;
  };
  quantity: number;
  type: "crypto" | "stock";
};

type CreateHoldingResponse =
  | {
      success: true;
      data: typeof holdings.$inferSelect;
      message: null;
    }
  | {
      success: false;
      data: null;
      message: string;
    };

export async function createHolding(
  data: CreateHoldingParams,
): Promise<CreateHoldingResponse> {
  try {
    // Validate that data exists
    if (!data) {
      return {
        success: false,
        data: null,
        message: "Incomplete fields",
      };
    }

    const { asset, quantity, type } = data;

    // Validate required fields
    if (
      !asset ||
      !asset.id ||
      !asset.symbol ||
      !asset.name ||
      quantity === undefined ||
      quantity === null ||
      !type
    ) {
      return {
        success: false,
        data: null,
        message: "Incomplete fields",
      };
    }

    // Validate quantity
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) {
      return {
        success: false,
        data: null,
        message: "Quantity must be a valid number",
      };
    }

    if (quantity <= 0) {
      return {
        success: false,
        data: null,
        message: "Quantity must be greater than 0",
      };
    }

    // Validate type
    if (type !== "crypto" && type !== "stock") {
      return {
        success: false,
        data: null,
        message: "Invalid holding type",
      };
    }

    const [holding] = await db
      .insert(holdings)
      .values({
        userId: "XYZ",
        asset: asset.name,
        quantity: quantity.toString(),
        type,
      })
      .returning();

    return {
      success: true,
      data: holding,
      message: null,
    };
  } catch (error) {
    console.error("createHolding error:", error);

    return {
      success: false,
      data: null,
      message: "Failed to create holding",
    };
  }
}
