require 'rails_helper'

RSpec.describe StylesheetUploader do
  include_context 'clear_uploaded_files'

  let(:css) { "body {\r\n  padding: 4em;\r\n}" }
  let(:site) { FactoryGirl.build(:site) }
  subject { StylesheetUploader.new(site) }

  describe 'store' do
    it 'must be css' do
      expect {
        subject.store! StringUploader.new("stylesheet.exe", css)
      }.to raise_error(
        CarrierWave::IntegrityError,
        'You are not allowed to upload "exe" files, allowed types: css'
      )
    end

    it 'has filename which is  md5 of content' do
      expect(uploaded_files).to eq []

      subject.store! StringUploader.new("stylesheet.css", css)

      expect(uploaded_files).to eq ['e6df26f541ebad8e8fed26a84e202a7c.css']
    end
  end

  describe '.asset_host' do
    it 'uses sites asset_host' do
      expect(subject.asset_host).to eq site.asset_host
    end
  end

  describe '.fog_directory' do
    it 'uses sites fog_directory' do
      expect(subject.fog_directory).to eq site.fog_directory
    end
  end
end