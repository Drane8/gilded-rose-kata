import { BRIE, BACKSTAGE_PASSES, MIN_QUALITY, SULFURAS, MAX_QUALITY, BACKSTAGE_DOUBLE_PRICE_DATE, BACKSTAGE_TRIPLE_PRICE_DATE, RECOMMENDED_SELLIN_DATE } from "./constants";

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
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != BRIE &&
        this.items[i].name != BACKSTAGE_PASSES
      ) {
        if (this.items[i].quality > MIN_QUALITY) {
          if (this.items[i].name != SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < MAX_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == BACKSTAGE_PASSES
          ) {
            if (this.items[i].sellIn < BACKSTAGE_DOUBLE_PRICE_DATE) {
              if (this.items[i].quality < MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < BACKSTAGE_TRIPLE_PRICE_DATE) {
              if (this.items[i].quality < MAX_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < RECOMMENDED_SELLIN_DATE) {
        if (this.items[i].name != BRIE) {
          if (
            this.items[i].name != BACKSTAGE_PASSES
          ) {
            if (this.items[i].quality > MIN_QUALITY) {
              if (this.items[i].name != SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < MAX_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
