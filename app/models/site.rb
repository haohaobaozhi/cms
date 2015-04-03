# == Schema Information
#
# Table name: sites
#
#  id                   :integer          not null, primary key
#  host                 :string(64)       not null
#  name                 :string(64)       not null
#  sub_title            :string(64)
#  layout               :string(32)       default("one_column")
#  main_menu_page_ids   :text
#  copyright            :string(64)
#  google_analytics     :string(32)
#  charity_number       :string(32)
#  stylesheet_filename  :string(36)
#  logo_filename        :string(36)
#  sidebar_html_content :text
#  created_by_id        :integer          not null
#  updated_by_id        :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  main_menu_in_footer  :boolean          default(FALSE), not null
#  separate_header      :boolean          default(TRUE), not null
#  facebook             :string(32)
#  twitter              :string(15)
#  linkedin             :string(32)
#  github               :string(32)
#

class Site < ActiveRecord::Base
  LAYOUTS = %w(one_column right_sidebar small_right_sidebar)

  belongs_to :created_by, class_name: 'User'
  belongs_to :updated_by, class_name: 'User'

  has_and_belongs_to_many :users, -> { order :email }

  has_many :images, -> { order :name }, dependent: :destroy
  has_many :messages, -> { order 'created_at desc' }, dependent: :destroy
  has_many :pages, -> { order :name }, dependent: :destroy

  has_paper_trail

  serialize :main_menu_page_ids, Array

  mount_uploader :stylesheet, StylesheetUploader, mount_on: :stylesheet_filename
  mount_uploader :logo, LogoUploader, mount_on: :logo_filename

  strip_attributes except: :sidebar_html_content, collapse_spaces: true

  auto_validate
  validates *(attribute_names - ['sidebar_html_content']), no_html: true
  validates :name, length: { maximum: 64 }
  validates :sub_title, length: { maximum: 64 }
  validates :layout, inclusion: { in: LAYOUTS }
  validates :copyright, length: { maximum: 64 }
  validates :facebook, length: { maximum: 32 }
  validates :twitter, length: { maximum: 15 }
  validates :linkedin, length: { maximum: 32 }
  validates :github, length: { maximum: 32 }

  validates :google_analytics, format: {
    with: /\AUA-[0-9]+-[0-9]{1,2}\z/,
    allow_blank: true
  }

  validates :created_by, presence: true
  validates :updated_by, presence: true

  def css
    stylesheet.read
  end

  def css=(posted_css)
    posted_css.gsub!(/\t/, '  ')
    posted_css.gsub!(/ +\r\n/, "\r\n")

    self.stylesheet = StringUploader.new('stylesheet.css', posted_css)
  end

  def email
    "noreply@#{host.gsub(/^www\./, '')}"
  end

  def main_menu_pages
    pages = Page.find(main_menu_page_ids)

    main_menu_page_ids.map do |id|
      pages.find { |page| page.id == id }
    end
  end

  def store_dir
    [Rails.application.secrets.uploads_store_dir, id].compact.join('/')
  end

  def social_networks?
    !(!facebook && !twitter && !linkedin && !github)
  end
end
