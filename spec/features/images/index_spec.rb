require 'rails_helper'

RSpec.feature 'Index images' do
  let!(:image_b) { FactoryGirl.create(:image, name: 'Image B') }
  let!(:image_c) { FactoryGirl.create(:image, name: 'Image C') }
  let!(:image_a) { FactoryGirl.create(:image, name: 'Image A') }
  let!(:other_site_image) { FactoryGirl.create(:image, site: FactoryGirl.create(:site)) }

  let(:go_to_url) { '/site/images' }

  authenticated_page topbar_link: 'Images', page_icon: 'picture-o' do
    scenario 'visiting the page' do
      visit_200_page

      links = all('#cms-article a')
      expect(links.size).to eq 3

      expect(links[0]['href']).to eq image_a.file.url
      image_1 = links[0].find('img')
      expect(image_1['src']).to eq image_a.file.span3.url
      expect(image_1['alt']).to eq image_a.name

      expect(links[1]['href']).to eq image_b.file.url
      image_2 = links[1].find('img')
      expect(image_2['src']).to eq image_b.file.span3.url
      expect(image_2['alt']).to eq image_b.name

      expect(links[2]['href']).to eq image_c.file.url
      image_3 = links[2].find('img')
      expect(image_3['src']).to eq image_c.file.span3.url
      expect(image_3['alt']).to eq image_c.name
    end
  end
end