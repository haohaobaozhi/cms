# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  site_id    :integer          not null
#  subject    :string(64)       not null
#  name       :string(64)       not null
#  email      :string(64)       not null
#  phone      :string(32)
#  message    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_agent :text
#  ip_address :string(45)
#
# Indexes
#
#  fk__messages_site_id  (site_id)
#
# Foreign Keys
#
#  fk_messages_site_id  (site_id => sites.id)
#

FactoryGirl.define do
  factory :message do
    site { Site.first || FactoryGirl.create(:site) }

    subject { Faker::Name.name }
    name { Faker::Name.name }
    email { Faker::Internet.email }
    phone { "+447#{rand(1_000_000_000).to_s.ljust(9, '0')}" }
    message { Faker::Lorem.paragraph }
  end
end
