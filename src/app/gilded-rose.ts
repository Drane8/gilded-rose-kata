import {
  BRIE,
  BACKSTAGE_PASSES,
  MIN_QUALITY,
  SULFURAS,
  MAX_QUALITY,
  BACKSTAGE_DOUBLE_PRICE_DATE,
  BACKSTAGE_TRIPLE_PRICE_DATE,
  RECOMMENDED_SELLIN_DATE,
} from "./constants";

export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export class GildedRose {
  constructor(public items: Array<Item> = []) {}

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === SULFURAS) {
        return;
      }
      item.sellIn = item.sellIn - 1;
      if (item.name === BRIE) {
        item.quality = item.quality + 1;
        if (item.sellIn < RECOMMENDED_SELLIN_DATE) {
          item.quality = item.quality + 1;
        }
        if (item.quality > MAX_QUALITY) {
          item.quality = MAX_QUALITY;
        }
        return;
      }

      if (item.name === BACKSTAGE_PASSES) {
        item.quality = item.quality + 1;
        if (item.sellIn < BACKSTAGE_DOUBLE_PRICE_DATE) {
          item.quality = item.quality + 1;
        }
        if (item.sellIn < BACKSTAGE_TRIPLE_PRICE_DATE) {
          item.quality = item.quality + 1;
        }
        if (item.quality > MAX_QUALITY) {
          item.quality = MAX_QUALITY;
        }
        if (item.sellIn < RECOMMENDED_SELLIN_DATE) {
          item.quality = MIN_QUALITY;
        }
        return;
      }

      item.quality = item.quality - 1;
      if (item.sellIn < RECOMMENDED_SELLIN_DATE) {
        item.quality = item.quality - 1;
      }
      if (item.quality < MIN_QUALITY) {
        item.quality = MIN_QUALITY;
      }
    });
    return this.items;
  }
}
