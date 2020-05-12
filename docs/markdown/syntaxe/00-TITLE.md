<!-- .slide: class="transition"-->  

# La syntaxe

##==##
<!-- .slide: -->

# La syntaxe
<br/>

## Les variables
Il y a deux types de variables utilisables : 
* Les **facts** - les variables liées au système et non modifiables
* les variables *classiques*

Notes:
Tous les types de variables sont utilisable dans les playbook.
Par contre, pour que les facts soit utilisable dans un playbook, il faut définir gather_facts sur yes dans le playbook.

##==##
<!-- .slide: -->

# La syntaxe
<br/>

## Les variables - Les Facts
Une commande suffit pour afficher les *facts* :  
```bash
ansible all -m setup
```

Il est possible de filtrer pour n'afficher que certains éléments : 
```bash
# affiche seulement les facts de certaines interfaces.
# ansible all -m setup -a 'filter=ansible_eth[0-2]'

# Affiche uniquement les facts liés au réseau.
# ansible all -m setup -a 'gather_subset=network'
```

##==##

<!-- .slide: -->
# La syntaxe
<br/>

## Le YAML
Le **YAML** est un format de représentation de données par sérialisation unicode.  
Il est plus **humainement lisible** que le *XML* ou le *JSON*.  
L'idée du **YAML** est que toute donnée (à certaines exceptions) peut être représentée sous forme de listes ou de tableaux.

<br/>

## Le JINJA
Le **Jinja** est un moteur de template destiné au **Python**.
Ansible utilise ce moteur de templating dans le but d'effectuer de l'interpolation de variable dans les **Playbooks**

##==##

<!-- .slide: class="with-code" -->
# La syntaxe
<br/>

## Exemple de variables
<!-- .element: class="center" -->
```yaml
create_key: yes

skills:
  - python
  - perl
  - pascal

martin:
-  martin:
    name: Martin
    job: Developer
    skills:
      - python
      - perl
      - pascal

include_newlines: |
            exactly as you see
            will appear these three
            lines of poetry
```

##==##
<!-- .slide: -->

# La syntaxe
<br/>

## Interpolation de variables
Dans les playbooks, l'interpolation des variables est très simple:
```yaml
- name: Run a cmd.exe command
  psexec:
    hostname: "{{ server.name }}"
    connection_username: "{{ server.username }}"
    connection_password: "{{ server.password }}"
    executable: "{{ server.cmd.exe }}"
    arguments: "{{  server.cmd.argument }}"
```

##==##

<!-- .slide: -->
# La syntaxe
<br/>

## Interpolation de variables
Dans les templates, cela requiert d'un peu plus de technique...
<!-- .element: class="center" -->
````yaml
{% if prometheus.alertmanager_config != [] %} … {% endif %}

{{ regex_replace('.tar.gz','') }}

{{ prometheus.remote_read | to_nice_yaml(indent=2) | indent(2, False) }}

{% for item in PGPOOL_IP %} … {% endfor%}
````

##==##
<!-- .slide: -->
# La syntaxe
<br/>

## Les instructions conditionnelles
Le résultat d’un playbook dépend souvent d’une value, d’un “fact” ou bien du résultat d’un précédent playbook.
Les instructions conditionnelles sont les suivantes :
* when
* Register

##==##
<!-- .slide: class="with-code" -->

# La syntaxe
<br/>

## Les instructions conditionnelles

<!-- .element: class="center" -->
```yaml
tasks:
  - name: "shut down Debian flavored systems"
    command: /sbin/shutdown -t now
    when: ansible_facts['os_family'] == "Debian"

tasks:
  - command: /bin/false
    register: result
    ignore_errors: True

  - command: /bin/something
    when: result is failed

tasks:
  - command: echo {{ item }}
    loop: [ 0, 2, 4, 6, 8, 10 ]
    when: item > 5
```

##==##
<!-- .slide: -->

# La syntaxe
<br/>

## Les boucles
Ce type d’instruction permet d’itérer sur :
* Des listes
* Des listes de hashes
* Un dictionnaire
* Des listes de listes
* L’inventaire

Il est possible d’ajouter des contrôles sur ces boucles.

Depuis ansible 2.5, une migration de “with_x” vers “loop” est en cours...mais les deux syntaxes sont valide.

##==##
<!-- .slide: class="with-code" -->

# La syntaxe
<br/>

## Les boucles

<!-- .element: class="center" -->
```yaml
- name: add several users
  user:
    name: "{{ item }}"
    state: present
    groups: "wheel"
  loop:
     - testuser1
     - testuser2

- name: add several users
  user:
    name: "{{ item.name }}"
    state: present
    groups: "{{ item.groups }}"
  loop:
    - { name: 'testuser1', groups: 'wheel' }
    - { name: 'testuser2', groups: 'root' }
```
