<!-- .slide: class="transition"-->  

# La syntaxe

##==##

<!-- .slide: -->
# La syntaxe
<br/>

## Le YAML
Le langage utilisé spécialement pour faciliter la lisibilité des “tasks” et des “playbooks”.  
3 types de variables : 
* Strings
* booleens
* Listes
* Maps 
* Types complexes, tels que map contenant des listes
* Multi-line via “|”

Notes:
Les strings incluent le texte et les nombres, les maps sont des dictionnaire

##==##

<!-- .slide: class="with-code" -->
# La syntaxe
<br/>

## Le YAML
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

## Le JINJA
Le Jinja est uniquement utilisé dans les templates dans le but d’interpoler les variables.  
Les types de données utilisables sont : 
* Les boucles
* Les expressions conditionnelles
* Les variables
* Indentation
* Conversion de type
* Regex

##==##

<!-- .slide: class="with-code" -->
# La syntaxe
<br/>

## Le JINJA
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
