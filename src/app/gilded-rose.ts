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
      if (item.name === BRIE || item.name === BACKSTAGE_PASSES) {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
          if (item.name === BACKSTAGE_PASSES) {
            if (item.sellIn < BACKSTAGE_DOUBLE_PRICE_DATE) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < BACKSTAGE_TRIPLE_PRICE_DATE) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      } else if (item.quality > MIN_QUALITY) {
        item.quality = item.quality - 1;
      }

      item.sellIn = item.sellIn - 1;
      if (item.sellIn < RECOMMENDED_SELLIN_DATE) {
        if (item.name != BRIE) {
          if (item.name != BACKSTAGE_PASSES) {
            if (item.quality > MIN_QUALITY) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;
          }
        }
      }
    });
    return this.items;
  }
}
