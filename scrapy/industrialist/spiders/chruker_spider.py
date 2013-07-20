from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from scrapy.http.request import Request

from industrialist.items import MarketItem

import re
import os

class ChrukerSpider(BaseSpider):
  name = "chruker"
  allowed_domains = ["games.chruker.dk"]
  start_urls = ['http://games.chruker.dk/eve_online/market.php?group_id=500']

  def parse(self, response):
    items = []
    hxs = HtmlXPathSelector(response)

    for row in hxs.select('//tbody/tr'):
      try:
        item = MarketItem()
        cells = row.select('td')
        item['name'] = cells[1].select('a/b/text()')[0].extract()
        item['id'] = cells[1].select('a/@href')[0].extract().split('=')[1]
        item['description'] = cells[1].select('span[@class="note"]/text()')[0].extract()
        item['volume'] = ''.join(cells[2].select('text()')[0].extract().strip().split(','))

        items.append(item)
      except:
        continue

    return items
