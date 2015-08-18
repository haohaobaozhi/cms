require 'rails_helper'

RSpec.describe ApplicationHelper, '#icon_tag', type: :helper do
  it 'renders an icon' do
    expect(icon_tag('icon')).to eq '<i class="fa fa-icon"></i>'
  end
end