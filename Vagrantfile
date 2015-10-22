Vagrant.configure(2) do |config|
  fail "Run 'vagrant plugin install landrush'" unless Vagrant.has_plugin? 'landrush'
  config.landrush.enabled = true

  fail "Run 'vagrant plugin install vagrant-timezone'" unless Vagrant.has_plugin? 'vagrant-timezone'
  config.timezone.value = :host

  config.ssh.forward_agent = true
  config.vm.box = 'ubuntu/trusty64'
  config.vm.hostname = 'cms.vagrant.dev'
  config.vm.network 'private_network', type: 'dhcp'
  config.vm.synced_folder '.', '/vagrant', nfs: true

  config.vm.provider :virtualbox do |virtualbox|
    virtualbox.memory = 2048
  end

  config.vm.provision 'shell', inline: <<-SHELL
    apt-get update
    apt-get install -y ruby-dev
    gem install librarian-puppet --no-rdoc --no-ri
    cd /vagrant/puppet
    librarian-puppet install
  SHELL

  config.vm.provision 'puppet' do |puppet|
    puppet.manifest_file = 'development.pp'
    puppet.manifests_path = 'puppet/manifests'
    puppet.module_path = ['puppet/modules', 'puppet/modules_custom']
    puppet.synced_folder_type = 'nfs'
  end
end
