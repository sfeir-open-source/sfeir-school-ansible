<!-- .slide: class="transition"-->  

# Concepts

##==##

<!-- .slide: -->
# Concepts
<br/>

## Control Node
Il s'agit du serveur depuis lequel les commandes ansible seront exécutées.  

![h-400:center](./assets/images/control_node.png)


##==##
<!-- .slide: -->

# Concepts
<br/>

## Managed Node
Il s'agit des machines de l'inventaire sur lesquelles les tâches du playbook seront exécutées.

![h-400:center](./assets/images/managed_nodes.png)

##==##
<!-- .slide: -->

# Concepts
<br/>

## Inventaire

Il s'agit de la liste des *Managed Nodes*.
Dans certains cas, l'inventaire peut contenir plusieurs informations telles que :
* L'address IP
* Le *user*
* La clé SSH

Les serveurs cibles peuvent également être organisés sous forme de groupes.

Notes: 
Le Control Node communique avec le Managed Node via SSH, s'il s'agit d'une machine Linux, ou via Powershell Remoting dans le cas d'une machine Windows.
Contrairement à SaltStack (par exemple), Ansible est agentless, il n'y a pas besoin d'un client Ansible pour communiquer avec les Managed Nodes.
Contrairement à l'inventaire dynamique (qui sera abordé plus tard), l'inventaire statique est plus simple à utiliser mais parfois plus compliqué à maintenir en environnement Cloud.

##==##
<!-- .slide -->

# Concepts
<br/>

## Inventaire Statique

Sur un inventaire statique, nous avons besoin des paramètres suivants : 

| paramètres | values | requis |
| ---------- | ------ | ------ |
| ansible_connection | ssh/winrm/localhost | oui |
| ansible_host | le nom du host auquel se connecter | oui |
| ansible_port | les ports SSH ou winrm définis sur les machines ciblées | oui - uniquement si les ports ne sont pas ceux par défaut |
| ansible_user | root ou administrator (Windows) ou tout autre user ayant des droits assez élevés | non |
| ansible_ssh_pass | Mot de passe de l'utilisateur admin | non |

Notes:
Ce sont les paramètres les plus courants dans un inventaire statique.
D'autres paramètres, en rapport avec le type de connexion (SSH ou non-SSH) ou avec l'élévation des privilèges ou avec les paramètres d'environnement.
Dans le cas d'une connexion NON-SSH, il s'agit de local ou de docker

##==##
<!-- .slide: -->

# Concepts
<br/>

## Inventaire Statique

**Important**
* Ansible peut utiliser deux formes d'inventaire statique différent : **INI** ou **YAML**
* Si vous travaillez avec plusieurs environnements, il est recommandé d'utiliser plusieurs inventaires
* Comme évoqué un peu plus tôt, vous pouvez grouper vos *managed nodes*
* Et utiliser des variables spécifiques à ces groupes

Notes:
- L'inventaire YAML est une reproduction de l'inventaire INI.
- lorsque vous invoquez la commande ansible-playbook, c'est à ce moment que vous préciserez l'inventaire à utiliser.
- certains groupes peuvent contenir des managed nodes d'autres groupes, vous pouvez également créer des groupes enfants
- si les variables en question sont stockées dans un dossier group_vars/[GROUP_NAME]/settings.yaml

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les modules
Chaque module a une utilisation particulière, de l'administration des utilisateurs sur un type spécifique de base de données à la gestion des interfaces VLAN sur un type spécifique de périphérique réseau.
Le but d'un module est de proposer une commande a exécuter afin d'effectuer une action particulière.
![h-500:center](./assets/images/modules.png)

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les modules
Chaque module dispose de paramètres ainsi que des pré-requis.  
Par exemple : *psexec*   
Ses pré-requis : 
* pypsexec
* smprotocol[kerberos]

![h-400:center](./assets/images/psexec.png)

Notes:
Le screenshot ne contient pas tous les paramètres nécessaires à l'utilisation de ce module.

##==##
<!-- .slide: -->

# Concepts
<br/>

## Le principe d'idempotence
l'idempotence signifie qu'une opération a le même effet qu'on l'applique une ou plusieurs fois.

C'est pour cela que les actions système telles que l'installation de package ou le démarrage de services ne proposent que les statuts suivants : 
* started / stopped / restarted
* présent / absent
* enabled / disabled

Notes:
Ainsi, si le service est déjà démarré ou le package déjà installé, Ansible n'y touchera pas. 

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les tasks
L’unité de base d’un playbook et de la commande ansible qui sera exécutée sur un ou plusieurs hôtes.

![h-200:center](./assets/images/tasks.png)

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les playbook
Il s’agit d’une liste de tâches ou de rôles à exécuter sur un ou plusieurs hôtes.

![h-400:center](./assets/images/playbook.png)
