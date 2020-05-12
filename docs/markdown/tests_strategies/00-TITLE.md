<!-- .slide: class="transition"-->  

# Les stratégies de test

##==##

<!-- .slide: -->

# Les stratégies de test

Il y a deux modes de tests : 
* Interne, à l’aide des options et modules prévues :
 * check_mode
 * wait_for
 * fail
 * stat
 * assert

* Externe.  
Certains plugins python, tels que molecule ou testinfra, existent et nécessitent une certaine connaissance de python

##==##

<!-- .slide: -->

# Les stratégies de test
<br/>

## Interne
Ansible fourni des modules de tests permetant de : 
* vérifier que telle tâche a bien été effectuée
* que tel fichier se trouve bien au bon endroit
* que telle variable se trouve bien dans le bon fichier
* que tel port est bien ouvert
* que tel service système est bien activé ou bien démarré

Et permet également de s'assurer que si une tâche, non essentielle au bon démarrage du middleware en cours d'installation, ne s'effectue pas correctement ou échoue ne perturbe pas le déroulement du playbook.

##==##

<!-- .slide: class="with-code" -->

# Les stratégies de test
<br/>

## Interne
<!-- .element: class="center" -->
```yaml
- script: verify.sh
  check_mode: no

- wait_for:
    host: "{{ inventory_hostname }}"
    port: 22

- fail:
    msg: 'service is not happy'
  when: "'AWESOME' not in webpage.content"

- shell: /usr/bin/some-command --parameter value
  register: cmd_result

- assert:
    that:
      - "'not ready' not in cmd_result.stderr"
      - "'gizmo enabled' in cmd_result.stdout"
```

##==##

<!-- .slide: -->

# Les stratégies de test
<br/>

## Externe
De nombreux outils de tests externe existent, parmi eux : 
* testinfra
* molecule
* TestKitchen

Molecule et TestKitchen sont complet : 
* TestInfra est intégré dans molecule, 
* Molecule peut initier la création d'un rôle avec un squelette complet,
* Molecule et TestKitchen permettent de définir un environnement de test ainsi qu'un scénario (dossier molecule)

Molecule et TestKitchen sont basés sur des langages différents : Python et Ruby

##==##

<!-- .slide: class="with-code" -->

# Les stratégies de test
<br/>

## Externe
### TestInfra
<!-- .element: class="center" -->
```python
import testinfra

def test_os_release(host):
    assert host.file("/etc/os-release").contains("Fedora")

def test_sshd_inactive(host):
    assert host.service("sshd").is_running is False
```
##==##

<!-- .slide: class="with-code" -->

# Les stratégies de test
<br/>

## Externe
### Molecule
<!-- .element: class="center" -->
Exemple de scénario de test
```yaml
check_sequence:
- destroy
- create
- prepare
- converge
- check
- destroy
```
Le test du playbook/role en lui même correspond à l'étape *converge*.

##==##
<!-- .slide: -->

# Les stratégies de test
<br/>

## Externe
### TestKitchen
Tout comme Molecule, KitchenCi fournit un "runner" pour l'exécution des tests d’infrastructure de manière isolée et une architecture de "driver" afin de cibler différentes plateformes, telles que Vmware, Amazon EC2, Vagrant, Docker et bien d’autres.  
La stack complète permettant l'écriture et l'exécution des tests de code Ansible via TestKitchen est la suivante :  
![h-100](./assets/images/Webp.net-resizeimage.jpg)

##==##
<!-- .slide: class="with-code" -->

# Les stratégies de test
<br/>

## Externe
### TestKitchen

Exemple de scénarion
<!-- .slide: class="center" -->
```yaml
# Requirements :
# gem install kitchen-docker kitchen-ansible


driver:
  name: docker
  use_sudo: false
  require_chef_omnibus: false # No need of chef
  require_ruby_for_busser: true
  private_key: spec/id_rsa
  public_key: spec/id_rsa.pub


provisioner:
    name: ansible_playbook
    #roles_path: .
    ansible_version: latest
    require_ansible_repo: false
    ansible_connection: ssh
    #group_vars_path: ./group_vars
    ansible_host_key_checking: false
    playbook: playbook.yml
    # list of requirements role
    # requirements_path: requirements.yml
    private_key: spec/id_rsa # -------#################--- Not needed ?
    require_chef_for_busser: false
    ansible_inventory: ./kitchen-hosts
    # e.g.: 1 => '-v', 2 => '-vv', 3 => '-vvv", ...
    ansible_verbose: true
    ansible_verbosity: 2
    # Add some random variables
    # extra_vars:
    # copy additional playbook dir
    additional_copy_path:
        - plays
    #http_proxy: http://xxxxx@xxxxx:8080
    #https_proxy: http://xxxxx@xxxxx:8080
    #no_proxy: localhost,xxxx,xxxx
    #ansible_extra_flags: '--tags=debug,add_vhost,apache'
    #ansible_extra_flags: '--skip-tags=mytag1,mytag2 --limit=web'
    # extra_vars:
    #     version: '0.0.1-SNAPSHOT'
    #     env: staging
    #     repository: snapshots
    ignore_extensions_from_root: [".git"]
    ignore_paths_from_root: [".git",".kitchen","bin"]

transport:
     max_ssh_sessions: 5

verifier:
    name: serverspec
    sudo_path: true


platforms:
      - name: centos-kitchen
        driver_config:
          image: 'kemet/centos7-spec'


suites:
    - name: case1
      provisioner:
        ansible_playbook_command: echo 'NOOOP FOR ANSIBLE For This Container'
        require_ansible_omnibus: false
        require_ansible_source: false
        require_ansible_repo: false
        require_ruby_for_busser: true
      driver:
        provision_command:
          - "yum -y install iproute"
          - "yum -y install net-tools"
          - "yum -y install vim"
          - "yum -y install unzip"
        run_command: '/usr/sbin/init'
      driver_config:
        hostname: case1
        instance_name: 'case1'
        privileged: true
        volume: /sys/fs/cgroup:/sys/fs/cgroup
    

    - name: ansible
      provisioner:
        require_ansible_omnibus: false
        require_ansible_repo: true
        require_chef_for_busser: false
        require_ruby_for_busser: false
        private_key: spec/id_rsa
        ansible_verbosity: 2
      driver:
        provision_command:
          - "yum -y install iproute"
          - "yum -y install net-tools"
          - "yum -y install vim"
          - "sudo -H pip install  ansible==2.5.4"
          - "sudo -H pip install  Jinja2==2.10"
          - "sudo -H pip install  jmespath"
          - "sudo -H pip install  lxml"
        run_command: '/usr/sbin/init'
      driver_config:
        hostname: ansible
        instance_name: 'ansible'
        privileged: true
        volume: /sys/fs/cgroup
        links:
          - case1:case1
```

Notes:
Dans un fichier de configuration de TestKitchen, nous avons besoin des instructions suivantes : 
- Driver : Docker, Vagrant, kitchen-vcenter, etc...
- Provisionner : En l'occurence Ansible
- Transport : Concerne le nombre de connexion
- Verifier : Concerne le framework de test
- Platforms : Concerne l'image virtuelle ou, dans le cas de Docker, l'image Docker
- Suites : permet de configurer une instance particulière, c’est à dire que vous pouvez avoir plusieurs conteneurs (ou machines virtuelles) dans votre configuration et leur spécifier des paramètres différents selon les besoins
