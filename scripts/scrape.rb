require 'rubygems'
require 'mechanize'
require 'watir'
require 'json'
require 'open-uri'

url = 'http://www.wipo.int/branddb/en/index.jsp#'

browser = Watir::Browser.new :chrome, headless: true
browser.goto(url)
browser.link(text: 'Names').click
browser.input(id: 'HOL_input').send_keys(ARGV[0])
Watir::Wait.until { browser.text.include? 'search' }
browser.send_keys :enter
Watir::Wait.until { browser.text.include? 'options' }
browser.link(:visible_text => /options/).click
Watir::Wait.until { browser.text.include? 'Add All' }
browser.link(:visible_text => /Add All/).click
Watir::Wait.until { browser.text.include? 'Ok' }
browser.button(:visible_text => /Ok/).click
Watir::Wait.until { browser.text.include? 'Brand' }
doc = Nokogiri::HTML(browser.html)
number_of_rows =doc.xpath('//tr[@role = "row"]').count

@results = []
i = 0

while i <= number_of_rows-3 do

  elements = doc.xpath('//tr[@id = "' + i.to_s + '"]//td[@role = "gridcell"]')
  hash = { 
    owner_name: elements[11].text,
    trademark_name: elements[6].text,
    trademark_number: elements[13].text,
    application_date: elements[15].text,
    registration_date: elements[14].text,
    status: elements[8].text
  }

  @results << hash

  i = i + 1

end

puts @results.to_json
@results.to_json
