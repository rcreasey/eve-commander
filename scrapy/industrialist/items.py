from scrapy.item import Item, Field

class MarketItem(Item):
  id = Field()
  name = Field()
  description = Field()
  volume = Field()