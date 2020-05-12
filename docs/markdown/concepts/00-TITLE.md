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

Les serveurs cibles peuvent également être origanisés sous forme de groupes.

##==##
<!-- .slide -->

# Concepts
<br/>

## Les modules
Chaque module a une utilisation particulière, de l'administration des utilisateurs sur un type spécifique de base de données à la gestion des interfaces VLAN sur un type spécifique de périphérique réseau.

![h-500:center](./assets/images/modules.png)

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
