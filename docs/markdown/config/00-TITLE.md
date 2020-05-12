<!-- .slide: class="transition"-->  

# Premiers pas avec Ansible

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible
<br/>

## Installation
L'installation est possible via : 
* les repos officiels de chaque distribution (ici Ubuntu) : 
<!-- .slide: class="with-code-bg-dark" -->
```bash
apt update
apt install software-properties-common
apt-add-repository --yes --update ppa:ansible/ansible
apt install ansible
```
<!-- .element: class="big-code" -->
* ou via **pip** : 
<!-- .slide: class="with-code-bg-dark" -->
```bash
pip install ansible
```

##==##
<!-- .slide: -->
# Premiers pas avec Ansible
<br/>

## La configuration
Ansible génère sa propre configuration lors de son installation, cependant celle-ci est entièrement personnalisable : 
* via des fichiers additionnels
* grâce aux variables d'environnement
* par des options de la ligne de commande 

La syntaxe d'un fichier de configuration d'ansible est visible [ici]('https://github.com/ansible/ansible/blob/devel/examples/ansible.cfg').

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible
<br/>

## Découverte du logiciel
<br/>

### ansible

Exécute une tâche bien définie sur un ou plusieurs hôtes.

<!-- .element: class="center" -->
```bash
ansible [HOST] -m shell -a 'echo $TERM'
ansible [HOST] -m yum -a "name=nginx state=present"
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible
<br/>

## Découverte du logiciel
<br/>

### ansible-playbook

Permet d'exécuter les tâches suivantes : 
* Analyse l'inventaire
* Analyse les tags du playbook en fonction de l'inventaire 
* Démarre l'exécution du playbook
* Démarre la récupération des facts de chaque hôte de l'inventaire
* Exécute les tâches en fonction des tags ou des hôtes,
* déchiffre les variables vaultées (à la volée) et les applique.

<!-- .element: class="center" -->
```bash
ansible-playbook [PLAYBOOK] -i [INVENTAIRE]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-config
En fonction de l'option, effectue les actions suivantes : 
* list : affiche la configuration courante ainsi que les variables d'environnement
* dump : affiche les paramètres actuels, fusionne avec du fichier *ansible.cfg* (si l'on en spécifie un)
* view : affiche le fichier de configuration

<!-- .element: class="center" -->
```bash
ansible-config list
ansible-config dump -c [CONFIG_FILE] --only-changed
ansible-config view -c [CONFIG_FILE]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-console
Il s'agit de la console ansible permettant d'exécuter ou de tester les tasks.

<!-- .element: class="center" -->
```bash
ansible-console --step --playbook-dir [PLAYBOOK_DIR] --private-key [PRIVATE_KEY_FILE]\
--vault-id [VAULT_ID]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-doc
Il s'agit de la commande permettant de lire la documentation relative aux plugins.

<!-- .element: class="center" -->
```bash
ansible-doc [PLUGIN]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class='with-code-->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-galaxy
Selon l'option choisie, il s'agit de la commande permettant de créer/télécharger un rôle ou une collection : 
* role 
<!-- .element: class="center" -->
```bash
ansible-galaxy role init [ROLE]
ansible-galaxy role install [ROLE]
```
* collection
```bash
ansible-galaxy collection init [COLLECTION]
ansible-galaxy collection build [COLLECTION]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code" -->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-inventory
Affiche comment ansible *voit* l'inventaire. 
Permet également de vérifier que l'inventaire peut fonctionner.
<!-- .element: class="center" -->
```bash
ansible-inventory -i [INVENTAIRE]
```

<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code"-->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-pull
Récupère le playbook versionné sur un repository privé et l'exécute (en local ou sur une machine de l'inventaire).
<!-- .element: class="center" -->
```bash
ansible-pull --private-key [SSH_PRIVATE_KEY] [PLAYBOOK]
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code"-->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-vault
Permet de chiffrer et déchiffrer des secrets encodés uniquement à l'aide de lui-même.
Les secrets peuvent être : 

* mot de passe/login
* bloc de texte
* url
* fichier
* ensemble de fichiers.

##==##
<!-- .slide: class="with-code"-->

# Premiers pas avec Ansible 
<br/>

## Découverte du logiciel
<br/>

### ansible-vault
En définissant un mot de passe ou un vault lors du chiffrement, il est possible de déchiffrer à la volée, lors de l'exécution du playbook (ou de toute autre commande pour laquelle ce serait nécessaire), le(s) secret(s).
<!-- .element: class="center" -->
* Pour encoder
```bash
ansible-vault encrypt [FICHIER] --vault-password-file [FILE]
```
* Pour décoder
```bash
ansible-vault decrypt [FICHIER] --vault-password-file [FILE]
```
* Pour créer un Vault
```bash
ansible-vault create [VAULT_ID]
```
