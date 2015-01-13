require 'rails_helper'

RSpec.describe 'application', type: :feature do
  it 'redirects root path to home' do
    visit '/'
    expect(current_path).to eq '/home'
  end

  it 'renders page not found for urls with unkown format in' do
    visit '/home.txt'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  it 'renders page not found for unknown accept header' do
    page.driver.header('Accept', 'application/json')
    visit '/home'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  it 'renders page not found for urls with capitals in' do
    visit '/Home'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  it 'renders page not found for urls with dots in path' do
    visit '/file.pid/file'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  it 'renders page not found for unknown url' do
    visit '/badroute'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  context 'http' do
    it 'sets session cookie as http only' do
      visit_page '/home'

      expect(response_headers['Set-Cookie']).to_not include 'secure'
    end
  end

  context 'https' do
    it 'sets session cookie as https' do
      page.driver.browser.header('X-Forwarded-Proto', 'https')

      visit_page '/home'

      expect(response_headers['Set-Cookie']).to include 'secure'
    end
  end

  it 'renders site not found for unknown site' do
    site.destroy
    visit '/home'
    expect(page.status_code).to eq 404

    expect(find('title', visible: false).native.text).to eq 'Site Not Found'

    expect(page).to have_content 'Site Not Found'
    expect(page).to have_content 'Sorry'
  end

  it 'renders page not found for urls with .html in' do
    visit '/home.html'
    expect(page.status_code).to eq 404
    expect(page).to have_content 'Page Not Found'
  end

  it 'protects against attacks' do
    page.driver.browser.header('X_FORWARDED_FOR', 'x')
    page.driver.browser.header('CLIENT_IP', 'y')
    visit '/home'
    expect(page.status_code).to eq 403
  end

  it_behaves_like 'logged in account' do
    let(:go_to_url) { '/account/edit' }

    context 'after 30 days' do
      before do
        Timecop.travel Time.now + 31.days
      end

      after do
        Timecop.return
      end

      it_behaves_like 'restricted page'
    end
  end

  it 'stores session data in database' do
    visit_page '/home'
    expect(response_headers['Set-Cookie'])
      .to match(/^_cms_session=[0-9a-f]{32};.*/)
  end
end