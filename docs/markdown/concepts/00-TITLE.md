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
Pour être plus précis, il s'agit de l'exécution d'un module en fonction de paramètres (requis ou non).  
La task peut être définie dans un playbook ou dans un role (qui sera lui-même appelé par le playbook).

![h-200:center](./assets/images/tasks.png)

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les roles
Le principe d'un role est de décomposer un playbook complexe en élément réutilisable et *humainement lisible*.  
Un rôle fourni un cadre pour une réutilisation indépendante de : 
* variables
* tâches
* handlers
* templates

Chaque rôle est limité à une fonction particulière (installation/configuration d'Apache) et ne peut être exécuté que dans le cadre d'un playbook (contrairement à la tâche)

##==##
<!-- .slide: -->

# Concepts
<br/>

# Les roles - Anatomie
<br/>

![h-400:float-left](./assets/images/Screenshot%202020-05-20%20at%2016.31.32.png)

* tasks : Contient la liste des tâches  
* handlers : Contient les évènements systèmes
* files : Contient les fichiers à déployer
* templates : Contient les templates à déployer
* defaults : Contient les variables par défault du rôle
* meta : Définit certaines metadonnées pour ce rôle
* vars : Contient d'autres variables

##==##
<!-- .slide: -->

# Concepts
<br/>

## Les playbook
Il s’agit d’une liste de tâches ou de rôles à exécuter sur un ou plusieurs hôtes.

![h-400:center](./assets/images/playbook.png)
