import {
  pgEnum,
  pgTable,
  uuid,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const holdingTypeEnum = pgEnum("holding_type", ["crypto", "stock"]);

export const holdings = pgTable("holdings", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: text("user_id").notNull(),

  asset: text("asset").notNull(),

  quantity: numeric("quantity", {
    precision: 30,
    scale: 10,
  }).notNull(),

  type: holdingTypeEnum("type").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
